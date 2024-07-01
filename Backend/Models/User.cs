namespace noble_dream.Models
{
    public class User
    {
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public DateTime lastUpdateDate { get; set; }
        public int supportTime { get; set; }
        public bool doSupports {  get; set; }
        public bool isAdmin { get; set; }
    }
}
