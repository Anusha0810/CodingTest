using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyTask.Services;

namespace MyTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VechiclesController : ControllerBase
    {
        private readonly IVehicleService _service;
        public VechiclesController(IVehicleService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try{
                return Ok(_service.GetAll());
            } catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
