using Api_Prueba.Context;
using Api_Prueba.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api_Prueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmpleadoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Empleado
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empleado>>> GetAll()
        {
            return await _context.Empleado.ToListAsync();
        }

        // GET: api/Empleado/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Empleado>> GetById(int id)
        {
            var empleado = await _context.Empleado.FindAsync(id);
            if (empleado == null)
                return NotFound();

            return empleado;
        }

        // POST: api/Empleado
        [HttpPost]
        public async Task<ActionResult<Empleado>> Create(Empleado empleado)
        {
            _context.Empleado.Add(empleado);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = empleado.Id }, empleado);
        }

        // PUT: api/Empleado/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Empleado empleado)
        {
            if (id != empleado.Id)
                return BadRequest();

            _context.Entry(empleado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadoExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Empleado/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var empleado = await _context.Empleado.FindAsync(id);
            if (empleado == null)
                return NotFound();

            _context.Empleado.Remove(empleado);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmpleadoExists(int id)
        {
            return _context.Empleado.Any(e => e.Id == id);
        }
    }
}
