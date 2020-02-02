using Microsoft.EntityFrameworkCore;

namespace Data.Configuration
{
    public class EntityConfigurationManager
    {
        public static void Configure(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new PlansConfig());
        }
    }
}
