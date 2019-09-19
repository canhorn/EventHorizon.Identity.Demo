using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace EventHorizon.Identity.Demo.Controllers
{
    [Route("api/_authentication")]
    public class AuthenticationController : Controller
    {
        private readonly AuthenticationConfiguration _authenticationConfiguration;
        public AuthenticationController(
            IOptions<AuthenticationConfiguration> authenticationConfigurationOptions
        )
        {
            _authenticationConfiguration = authenticationConfigurationOptions.Value;
        }

        [HttpGet("[action]")]
        public AuthenticationConfiguration Configuration()
        {
            return _authenticationConfiguration;
        }

        public class AuthenticationConfiguration
        {
            public string Authority { get; set; }
            public string Audience { get; set; }
            [JsonProperty("client_id")]
            public string ClientId { get; set; }
            [JsonProperty("redirect_uri")]
            public string RedirectUri { get; set; }
            [JsonProperty("response_type")]
            public string ResponseType { get; set; }
            public string Scope { get; set; }
            [JsonProperty("post_logout_redirect_uri")]
            public string PostLogoutRedirectUri { get; set; }
        }
    }
}