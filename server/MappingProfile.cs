using AutoMapper;
using server.DTOs;
using server.Models;

namespace server
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserForUpdateDto, User>();
        }
    }

}
