
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
    public class EmailControler : Controller
    {

        private readonly IEmailSender emailSender;

        public EmailControler(IEmailSender emailSender)
        {

            this.emailSender = emailSender;
        }
    }
}