using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using noble_dream.Models;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
using System.Security.Principal;

namespace noble_dream.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        SqlConnection sqlConnection = new SqlConnection("Data Source=DESKTOP-MRHPHAA;Initial Catalog=noble_dream;User ID=sa;Password=passR42;Connect Timeout=30;Encrypt=True;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        MainController mainController = new MainController();

        [HttpPost("register")]
        public JsonResult Register(User user)
        {
            String checkQuery1 = $"select * from users where username='{user.username}'";
            String checkQuery2 = $"select * from users where email='{user.email}'";
            String insertQuery = @"insert into users (username,password,email) values (@Username,@Password,@Email)";
            
            sqlConnection.Open();
            try {
                SqlCommand checkCommand = new SqlCommand(checkQuery1, sqlConnection);
                SqlDataReader reader = checkCommand.ExecuteReader();
                if (!reader.Read()) // Herhangi bir satır döndü mü?
                {
                    checkCommand = new SqlCommand(checkQuery2, sqlConnection);
                    reader.Close();
                    reader = checkCommand.ExecuteReader();
                    if (!reader.Read())
                    {
                        if (mainController.isAllVaible(user).Equals("Vaible"))
                        {
                            reader.Close();
                            using (SqlCommand insertCommand = new SqlCommand(insertQuery, sqlConnection))
                            {
                                insertCommand.Parameters.AddWithValue("@Username", user.username);
                                insertCommand.Parameters.AddWithValue("@Password", user.password);
                                insertCommand.Parameters.AddWithValue("@Email", user.email);
                                insertCommand.ExecuteNonQuery();
                                return new JsonResult("Successfully created a new account");
                            }
                        }
                        else
                        {
                            reader.Close();
                            return new JsonResult(mainController.isAllVaible(user));
                        }
                    }
                    else
                    {
                        reader.Close();
                        return new JsonResult("There is an account with this email");
                    }
                }
                else
                {
                    reader.Close();
                    return new JsonResult("There is an account with this username");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Register Error"+ ex);
            }
            finally { sqlConnection.Close(); }
        }
        [HttpPost("login")]
        public JsonResult Login(User user)
        {
            sqlConnection.Open();
            try
            {
                String query = @"select * from users where (username='" + user.username + "' or email='" + user.username + "' ) and password='" + user.password + "'";
                SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);

                if (dataTable.Rows.Count > 0)
                {
                    if (Convert.ToBoolean(dataTable.Rows[0]["isActive"]))
                    {
                        int id = Convert.ToInt32(dataTable.Rows[0]["id"]);
                        String username = Convert.ToString(dataTable.Rows[0]["username"]);
                        String email = Convert.ToString(dataTable.Rows[0]["email"]);
                        int supportTime = Convert.ToInt32(dataTable.Rows[0]["supportTime"]);
                        bool doSupports = Convert.ToBoolean(dataTable.Rows[0]["doSupports"]);
                        bool isAdmin = Convert.ToBoolean(dataTable.Rows[0]["isAdmin"]);

                        return new JsonResult(new { id = id, username = username, email = email, supportTime = supportTime, doSupports = doSupports, isAdmin = isAdmin });
                    }
                    else
                    {
                        return new JsonResult("This Account is not active anymore");
                    }
                }
                else
                {
                    return new JsonResult("Username - email or password is wrong.");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Login Error: "+ex.Message);
            }
            finally
            {
                sqlConnection.Close();
            }
        }

        [HttpPut("update")]
        public JsonResult Update(int id, String whatToUpdate, String newState, String currentPass)
        {
            sqlConnection.Open();
            try
            {
                String query = $"select * from users where id='{id}' and password='{currentPass}'";
                SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);

                if (dataTable.Rows.Count > 0)
                {
                    if (whatToUpdate.Contains("mail"))
                    {
                        if (mainController.isVaible("email",newState).Equals("Vaible"))
                        {
                            query = $"update users set email='{newState}' where id='{id}'";
                        }
                        else
                        {
                            return new JsonResult(mainController.isVaible("email", newState));
                        }
                    }
                    else
                    {
                        if (mainController.isVaible("password", newState).Equals("Vaible"))
                        {
                            query = $"update users set password='{newState}' where id='{id}'";
                        }
                        else
                        {
                            return new JsonResult(mainController.isVaible("password", newState));
                        }
                    }
                    using (SqlCommand updateCommand = new SqlCommand(query, sqlConnection))
                    {
                        updateCommand.ExecuteNonQuery();
                        return new JsonResult("Updated data succesfully");
                    }
                }
                else
                {
                    return new JsonResult("Password is incorrect.");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Login Error: "+ ex.Message);
            }
            finally
            {
                sqlConnection.Close();
            }
        }
        [HttpPut("updateDate")]
        public JsonResult UpdateDate(int id)
        {
            sqlConnection.Open();
            try
            {
                String query = $"select * from users where id={id}";
                SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);

                if (dataTable.Rows.Count > 0)
                {
                    DataRow data = dataTable.Rows[0];
                    int supportTime = Convert.ToInt32(data["supportTime"]);
                    bool doSupports = Convert.ToBoolean(data["doSupports"]);
                    DateTime lastUpdateDate = Convert.ToDateTime(data["lastUpdateDate"]);

                    if (doSupports)
                    {
                        if (lastUpdateDate < DateTime.Now)
                        {
                            int monthsDifference = (DateTime.Now.Year - lastUpdateDate.Year) * 12 + DateTime.Now.Month - lastUpdateDate.Month;
                            int updatedSupportTime = supportTime + monthsDifference;
                            String updateDate = Convert.ToString($"{DateTime.Now.Year}-{DateTime.Now.Month}-{lastUpdateDate.Day}");
                            string updateQuery = $"update users set lastUpdateDate='{updateDate}', supportTime='{updatedSupportTime}' where id='{id}'";
                            using (SqlCommand updateCommand = new SqlCommand(updateQuery, sqlConnection))
                            {
                                updateCommand.ExecuteNonQuery();
                                return new JsonResult("Updated support time successfully.");
                            }
                        }
                        else
                        {
                            return new JsonResult("No need to update support time");
                        }
                    }
                    else
                    {
                        return new JsonResult("This user currently does not supports");
                    }
                }
                else
                {
                    return new JsonResult("There is no user with " + id + ". id in database");
                }
            }
            catch (Exception ex) 
            {
                return new JsonResult("Update Date Error: "+ ex.Message);
            }
            finally { sqlConnection.Close(); }
        }
        [HttpPut("toggle")]
        public JsonResult Toggle(int id,String thingToToggle)
        {
            sqlConnection.Open();
            try
            {
                String query = $"select * from users where id={id}";
                SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);

                if (dataTable.Rows.Count > 0)
                {
                    DataRow data = dataTable.Rows[0];
                    string updateQuery;
                    if (thingToToggle.ToLower().Contains("support"))
                    {

                        int x = 1;
                        if (Convert.ToBoolean(data["doSupports"]))
                        {
                            x = 0;
                        }
                        string currentDate = Convert.ToString(Convert.ToString(DateTime.Now.Year))+"-"+ Convert.ToString(Convert.ToString(DateTime.Now.Month))+"-"+ Convert.ToString(Convert.ToString(DateTime.Now.Day));
                        updateQuery = $"update users set lastUpdateDate='{currentDate}', doSupports={x} where id = {id}";
                    }
                    else
                    {
                        int x = 1;
                        if (Convert.ToBoolean(data["isActive"]))
                        {
                            x = 0;
                        }
                        updateQuery = $"update users set isActive={x} where id = {id}";
                    }
                    using (SqlCommand updateCommand = new SqlCommand(updateQuery, sqlConnection))
                    {
                        updateCommand.ExecuteNonQuery();
                    }
                    return new JsonResult("Toggled "+thingToToggle+" successfully.");
                }
                else
                {
                    return new JsonResult("There is no user with " + id + ". id in database (Toggle "+thingToToggle+" Error)");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Toggle "+thingToToggle+ " Error: " + ex.Message);
            }
            finally { sqlConnection.Close(); }
        }
        [HttpGet]
        public JsonResult Get()
        {
            sqlConnection.Open();
            try
            {
                string query = "select * from users";
                SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);
                if (dataTable.Rows.Count > 0)
                {
                    return new JsonResult(dataTable);
                }
                else
                {
                    return new JsonResult("Database is empty");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Get Error: " + ex.Message);
            }
            finally { sqlConnection.Close(); }
        }
        [HttpGet("GenerateKey")]
        public JsonResult GenerateKey(int id,string keyType,string gameName)
        {
            sqlConnection.Open();
            try
            {
                string query = $"select * from users where id='{id}'";
                SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);
                if (dataTable.Rows.Count > 0)
                {
                    DataRow data = dataTable.Rows[0];
                    int supportTime = Convert.ToInt32(data["supportTime"]);
                    int generatedKeyValue = Convert.ToInt32(data["generatedKeyValue"]);
                    if (keyType.Contains("discount"))
                    {
                        if (supportTime-generatedKeyValue >=3)
                        {
                            string generatedKey = mainController.generateKey();
                            string queryKey = "#discount_" + gameName + "/" + generatedKey;
                            if (generatedKeyValue!=0)
                            {
                                queryKey = Convert.ToString(data["generatedKeys"]) + queryKey ;
                            }
                            int newGeneratedKeyValue = generatedKeyValue + 3;
                            int newTotalGeneratedKeys = Convert.ToInt32(data["totalGeneratedKeys"])+1;
                            query = $"update users set generatedKeyValue='{newGeneratedKeyValue}', generatedKeys='{queryKey}',totalGeneratedKeys='{newTotalGeneratedKeys}' where id='{id}'";

                            using (SqlCommand updateCommand = new SqlCommand(query, sqlConnection))
                            {
                                updateCommand.ExecuteNonQuery();
                            }
                            return new JsonResult(generatedKey);
                        }
                        else
                        {
                            return new JsonResult("You can't afford a new key. You need to have at least 3 months of subscription to afford a discount key.");
                        }
                    }
                    else
                    {
                        if (supportTime - generatedKeyValue >= 9)
                        {
                            string generatedKey = mainController.generateKey();
                            string queryKey = "#game_" + gameName + "/" + generatedKey;
                            if (generatedKeyValue != 0)
                            {
                                queryKey = Convert.ToString(data["generatedKeys"]) + queryKey;
                            }
                            int newGeneratedKeyValue = generatedKeyValue + 9;
                            query = $"update users set generatedKeyValue='{newGeneratedKeyValue}', generatedKeys='{queryKey}' where id='{id}'";

                            using (SqlCommand updateCommand = new SqlCommand(query, sqlConnection))
                            {
                                updateCommand.ExecuteNonQuery();
                            }
                            return new JsonResult(generatedKey);
                        }
                        else
                        {
                            return new JsonResult("You can't afford a new key. You need to have at least 9 months of subscription to afford a free game key.");
                        }
                    }
                }
                else
                {
                    return new JsonResult("Cant find an user with '"+id+"' id");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Get Error: " + ex.Message);
            }
            finally { sqlConnection.Close(); }
        }
        [HttpGet("GetKeys")]
        public JsonResult GetKeys(int id)
        {
            sqlConnection.Open();
            try
            {
                string query = $"select * from users where id='{id}'";
                SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
                DataTable dataTable = new DataTable();
                adapter.Fill(dataTable);
                if (dataTable.Rows.Count > 0)
                {
                    String generatedKeys = Convert.ToString(dataTable.Rows[0]["generatedKeys"]);
                    if (generatedKeys.Contains("#"))
                    {
                        string[] keysString = generatedKeys.Split('#', StringSplitOptions.RemoveEmptyEntries);

                        List<Key> keys = new List<Key>();

                        foreach (string keyString in keysString)
                        {
                            string[] parts = keyString.Split('/');
                            if (parts.Length == 2)
                            {
                                string[] subParts = parts[0].Split('_');

                                if (subParts.Length == 2)
                                {
                                    Key key = new Key
                                    {
                                        type = subParts[0],
                                        game = subParts[1],
                                        value = parts[1]
                                    };
                                    keys.Add(key);
                                }
                            }
                        }
                        return new JsonResult(keys);
                    }
                    else
                    {
                        return new JsonResult("There is no key to get.");
                    }
                }
                else
                {
                    return new JsonResult("Cant find an user with '" + id + "' id");
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("Get Error: " + ex.Message);
            }
            finally { sqlConnection.Close(); }
        }
    }
}