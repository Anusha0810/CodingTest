using MyTask.Models;
using Newtonsoft.Json;

namespace MyTask.Repos
{
    public interface IVehicleRepo
    {
        List<Vehicle> GetAll();
        Vehicle GetById(int id);
    }
    public class VehicleRepo : IVehicleRepo
    {
        private readonly List<Vehicle> _vehicles;
        public VehicleRepo()
        {
            _vehicles = LoadData();
        } 
        public List<Vehicle> GetAll()
        {
            return _vehicles;
        }

        public Vehicle GetById(int id)
        {
            return _vehicles.FirstOrDefault(x=>x.Id==id);
        }

        private List<Vehicle> LoadData()
        {
            try
            {
                string path = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
                string json = File.ReadAllText(Path.Combine(path, "honda_wmi.json"));
                return JsonConvert.DeserializeObject<List<Vehicle>>(json);
            } catch {
                return new List<Vehicle>();
            }

        }
    }
}
