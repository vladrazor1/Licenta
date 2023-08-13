
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LicentaApi.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using LicentaApi.Models;

namespace LicentaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductControler : ControllerBase
    {
        private readonly ProductContext _context;
        private string _user = "";
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IEmailSender emailSender;
        // private readonly IEmailSender emailSender; 

        public ProductControler(ProductContext context, IHttpContextAccessor contextAccessor, IEmailSender emailSender)
        {
            _context = context;
            _httpContextAccessor = contextAccessor;
            if (_httpContextAccessor?.HttpContext?.User.Claims.ToArray().Length > 5)
            {
                _user = _httpContextAccessor?.HttpContext?.User.Claims.ToArray()[5].ToString().Split(":").Last().Trim();
            }
            this.emailSender = emailSender;
        }

        // GET: api/ProductControler
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/ProductControler/id
        [HttpGet("id")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Product>>> GetMyProduct()
        {
            var userId = _context.ApplicationUsers.Where(x => x.Username.ToLower().Trim().Equals(_user)).FirstOrDefault().Id;
            return await _context.Products.Where(x => x.UserId == userId).ToListAsync();

        }

        // GET: api/ProductControler/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Product>> GetProduct(long id)
        {
            var product = await _context.Products.Include(navigationPropertyPath: t => t.Overbiddings).FirstOrDefaultAsync(predicate: t => t.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost("email")]
        [Authorize]
        public async Task Index(EmailDTO emailDTO)
        {
            var emailAddress = _context.ApplicationUsers.Where(x => x.Username == _user).First().Email;
            await emailSender.SendEmailAsync(emailAddress, "Confirmation", $"Congratulations you overbidded on this product {emailDTO.ProductName} with this price {emailDTO.ProductPrice}");
            return;
        }

        // GET: api/ProductControler/5
        [HttpGet("title/{title}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductThatContainStrings(string title)
        {
            return await _context.Products.Where(x => x.Title.Contains(title)).ToListAsync();
        }

                // GET: api/Category/5
        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductWithSpecificCategory(long category)
        {
            return await _context.Products.Where(x => x.CategoryId.Equals(category)).ToListAsync();
            
        }

        // PUT: api/ProductControler/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutProduct(long id, ProductDTO productDTO)
        {
            if (id != productDTO.Id)
            {
                return BadRequest();
            }

            var product = await _context.Products.Where(x => x.Id == id).FirstOrDefaultAsync();

            product.Price = productDTO.Price;
            product.CategoryId= productDTO.CategoryId;
            product.Title = productDTO.Title;
            product.Text = productDTO.Text;
            product.View = productDTO.View;

            if (product.Overbiddings?.Count() < 1)
            {
                for (int i = 0; i < product.Overbiddings.Count; i++)
                {
                    if (product.Overbiddings[i].Id == 0)
                    {
                        _context.Overbiddings.Add(product.Overbiddings[i]);

                    }
                    else
                    {
                        _context.Entry(product.Overbiddings[i]).State = EntityState.Modified;

                    }
                }
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProductControler
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Product>> PostProduct([FromBody] ProductDTO productDTO)
        {
            var userId = _context.ApplicationUsers.Where(x => x.Username.ToLower().Trim().Equals(_user)).FirstOrDefault().Id;

            Product product = new Product
            {
                Id = productDTO.Id,
                UserId = (int)userId,
                CategoryId = productDTO.CategoryId,
                Price = productDTO.Price,
                Text = productDTO.Text,
                StartingDate = productDTO.StartingDate,
                ExpirationDate = productDTO.ExpirationDate,
                Title = productDTO.Title,
                Image = productDTO.Image,
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // DELETE: api/ProductControler/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProduct(long id)
        {
            var product = await _context.Products.Where(x => x.Id == id).Include(x => x.Overbiddings).FirstOrDefaultAsync();

            if (product.Overbiddings?.Count() > 0)
            {
                foreach (var item in product.Overbiddings)
                {
                    _context.Overbiddings.Remove(item);
                }
            }
            var user = _context.ApplicationUsers.Where(x => x.Id == product.UserId).Include(x => x.Products).FirstOrDefault();
            user.Products.Remove(product);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(long id)
        {
            return _context.Products.Any(e => e.Id == id);
        }

    }
}