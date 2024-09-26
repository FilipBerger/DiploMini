namespace DiploMini.Server
{
    public static class Validator
    {
        public static bool ValidatePlayers(List<string> playerNames)
        {
            HashSet<string> uniqueNames = new HashSet<string>();

            foreach (String name in playerNames)
            {
                if (string.IsNullOrEmpty(name))
                    return false;
                
                if (!uniqueNames.Add(name)) 
                    return false;
            }
            return true;
        }
    }
}
