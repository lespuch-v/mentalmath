namespace server
{
    public class JwtConfig
    {
        public string Secret { get; set; }

        public int TokenLifetime { get; set; }
    }

}
