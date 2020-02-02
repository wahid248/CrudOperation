using Core.Entities;
using Data.Base;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Data.Configuration
{
    public class PlansConfig : EntityConfigurationBase<Plans, long>
    {
        public override void Configure(EntityTypeBuilder<Plans> builder)
        {
            //write configs here



            base.Configure(builder);
            Seed(builder);
        }
        public void Seed(EntityTypeBuilder<Plans> builder)
        {

        }
    }
}
