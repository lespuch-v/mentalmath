using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using server.DTOs;
using server.Repositories;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _userRepository.GetUser(id);
        if (user == null)
            return NotFound();

        var userDto = _mapper.Map<UserDto>(user);
        return Ok(userDto);
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userRepository.GetAllUsers();
        var usersDto = _mapper.Map<IEnumerable<UserDto>>(users);
        return Ok(usersDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto dto)
    {
        if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

        var userFromRepo = await _userRepository.GetUser(id);
        if (userFromRepo == null)
            return NotFound();

        _mapper.Map(dto, userFromRepo);

        if (await _userRepository.SaveAllAsync())
            return NoContent();

        throw new Exception($"Updating user {id} failed on save");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

        var user = await _userRepository.GetUser(id);
        if (user == null)
            return NotFound();

        _userRepository.Delete(user);

        if (await _userRepository.SaveAllAsync())
            return Ok();

        throw new Exception($"Deleting user {id} failed on save");
    }

    [HttpPost("{id}/change-password")]
    public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePasswordDto dto)
    {
        if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

        var result = await _userRepository.ChangePassword(id, dto.OldPassword, dto.NewPassword);

        if (!result)
            return BadRequest("Password change failed.");

        return NoContent();
    }


    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var user = await _userRepository.GetUser(userId);
        if (user == null)
            return NotFound();

        var userDto = _mapper.Map<UserDto>(user);
        return Ok(userDto);
    }

    [Authorize]
    [HttpGet("{id}/name")]
    public async Task<IActionResult> GetUserName(int id)
    {
        if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

        var user = await _userRepository.GetUser(id);
        if(user == null)
            return NotFound();

        return Ok(new { user.Username });
    }

    [Authorize]
    [HttpPut("{id}/name")]
    public async Task<IActionResult> UpdateUserName(int id, [FromBody] UpdateUserNameDto dto)
    {
        if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

        var user = await _userRepository.GetUser(id);
        if (user == null)
            return NotFound();

        user.Username = dto.NewUsername;

        if (await _userRepository.SaveAllAsync())
            return NoContent();

        throw new Exception($"Updating username for user {id} failed on save");
    }

}
