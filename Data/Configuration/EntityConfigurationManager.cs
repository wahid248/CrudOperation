using Microsoft.EntityFrameworkCore;

namespace CrudOperation.Data.Configuration
{
    public class EntityConfigurationManager
    {
        public static void Configure(ModelBuilder builder)
        {
            //builder.ApplyConfiguration(new AnswersConfig())
            //    .ApplyConfiguration(new ApplicationUserConfig())
            //    .ApplyConfiguration(new EmailLogsConfig())
            //    .ApplyConfiguration(new InvitationsConfig())
            //    .ApplyConfiguration(new QuestionsConfig())
            //    .ApplyConfiguration(new QuestionSetsConfig())
            //    .ApplyConfiguration(new TemplatesConfig());
        }
    }
}
