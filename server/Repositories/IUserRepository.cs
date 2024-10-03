using server.Models;

namespace server.Repositories
{
    public interface IUserRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string email, string password);
        Task<bool> UserExists(string email);
        Task<User> GetUser(int id);
        Task<IEnumerable<User>> GetAllUsers();
        Task<bool> SaveAllAsync();
        void Delete<T>(T entity) where T : class;
        Task<bool> ChangePassword(int userId, string oldPassword, string newPassword);
    }

}
