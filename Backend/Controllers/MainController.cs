using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using noble_dream.Models;
using System.Net.Mail;
using System.Text;

namespace noble_dream.Controllers
{
    public class MainController : ControllerBase
    {
        public String isAllVaible(User user)
        {
            if (!isVaible("username", user.username).Equals("Vaible")) return isVaible("username", user.username);
            if (!isVaible("password",user.password).Equals("Vaible")) return isVaible("password", user.password);
            if (!isVaible("email", user.email).Equals("Vaible")) return isVaible("email", user.email);
            return "Vaible";
        }
        public String isVaible(String type, String data)
        {
            string returnType = char.ToUpper(type[0]) + type.Substring(1);
            if (data == null) return returnType + " cannot be left blank";
            if (data.Equals("")) return returnType + " cannot be left blank";

            int minLength;
            if (type.Equals("password")) minLength = 8;
            else if (type.Equals("username")) minLength = 4;
            else minLength = 7;

            if (data.Length < minLength) return returnType + " must contain at least "+Convert.ToString(minLength) +" letters";

            foreach (char letter in data)
            {
                if (letter < 32 || letter > 126)
                {
                    return returnType + " must only contain english letters";
                }
            }

            if (!data.Any(char.IsUpper) && type.Equals("password")) return "Passwords must contain at least 1 capital letter";
            if (!data.Any(char.IsLower) && type.Equals("password")) return "Passwords must contain at least 1 lowercase letter";
            if (!data.Any(char.IsDigit) && type.Equals("password")) return "Passwords must contain at least 1 number";

            if (!data.Contains("@") && type.Equals("email")) return "Emails must contain '@' in it";
            else if (type.Equals("email"))
            {
                int count = data.Count(c => c == '@');
                if (count > 1)
                {
                    return "Emails can't contain more then 1 '@' in it.";
                }
            }
            if (!data.Contains(".") && type.Equals("email")) return "Emails must contain '.' in it";
            else if (type.Equals("email"))
            {
                int count = data.Count(c => c == '.');
                if (count > 1)
                {
                    return "Emails can't contain more then 1 '.' in it.";
                }
            }

            if (type.Equals("email"))
            {
                string[] parts = data.Split('@');

                if (parts.Length == 2)
                {
                    string localPart = parts[0];
                    string domainPart = parts[1];
                    char[] forbiddenCharacters = { '.','{', '}', '(', ')', '%', '$', '!', '#', '&', '\'', '*', '/', '=', '?', '^', '`', '|', '~',' ' };

                    if (localPart == null || localPart == "") return "Invalid email local part (Part before '@'). It can't be left blank";
                    if (domainPart == null || domainPart == "") return "Invalid email domain (Part after '@'). It can't be left blank.";
                    if (domainPart.Length < 5) return "Invalid email domain (Part after '@'). It can't be less then 5 letters.";

                    foreach (char forbiddenChar in forbiddenCharacters)
                    {
                        if (localPart.Contains(forbiddenChar))
                        {
                            return $"Emails' local part (Part before '@') can't contain the character '{forbiddenChar}'.";
                        }
                    }

                    char[] forbiddenDomainCharacters = { '_','{', '}', '(', ')', '%', '$', '!', '#', '&', '\'', '*', '/', '=', '?', '^', '`', '|', '~', ' ' };

                    foreach (char forbiddenChar in forbiddenDomainCharacters)
                    {
                        if (domainPart.Contains(forbiddenChar))
                        {
                            return $"Email's domain part (Part after '@') can't contain the character '{forbiddenChar}'.";
                        }
                    }

                    string[] domain = domainPart.Split('.');
                    if (domain.Length == 2)
                    {
                        string domainPart1 = domain[0];
                        string domainPart2 = domain[1];
                        if (domainPart1.Length < 2) return "Email has invalid domain name (Part after '@' and before '.'). It must be more then 1 letters.";
                        else if (domainPart2.Length < 2) return "Email has invalid TLD (Part after '.'). It must be more then 1 letters.";
                    }
                    else return "Email has invalid domain.";
                }
                else return "Invalid email, email has no domain or no local part.";
            }

            return "Vaible";
        }
        public string generateKey()
        {
            string template = "AAAAA-AAAAA-AAAAA-AAAAA-AAAAA";
            StringBuilder result = new StringBuilder();
            Random random = new Random();

            foreach (char c in template)
            {
                if (c == '-')
                {
                    result.Append('-');
                }
                else
                {
                    char randomChar = (char)(random.Next(26) + 'A');
                    result.Append(randomChar);
                }
            }

            return result.ToString();
        }

    }
}
