using MyTask.Models;
using MyTask.Repos;

namespace MyTask.Services
{
    public interface IVehicleService
    {
        List<Vehicle> GetAll();
        Vehicle GetById(int id);
    }
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepo _vehicleRepo;
        
        public VehicleService(IVehicleRepo vehicleRepo)
        {
            _vehicleRepo = vehicleRepo;
        }
        public List<Vehicle> GetAll()
        {
            return _vehicleRepo.GetAll();
        }

        public Vehicle GetById(int id)
        {
            return _vehicleRepo.GetById(id);
        }
    }
}
