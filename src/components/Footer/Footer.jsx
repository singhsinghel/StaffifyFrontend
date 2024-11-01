import React from 'react';
const Footer = () => {
  return (
    <div
      className="footer flex flex-col p-5 w-full bg-[#333] text-white text-light justify-evenly min-h-[18rem]"

    >
      <div className="footer-content text-light flex flex-col md:flex-row gap-5 text-light">
        <div className="footer-content-left w-full md:w-1/2">
          <h2 className="font-bold text-3xl text-[#007BFF]">Staffify.</h2>
          <p>
            This is a employee management website. An admin can create an employee assign tasks  with tasks priority and can also send messages along with the tasks. Employee can mark task as accepted failed and completed. Employee can also add comments to a task. The completed or failed task can be assigned to other employees as well.
          </p>
        </div>
        <div className="footer-content-center w-full md:w-1/4">
          <h3 className="text-lg font-semibold">Company</h3>
          <ul className="font-light list-none space-y-2">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right w-full md:w-1/4">
          <h3 className="text-lg font-semibold">GET IN TOUCH</h3>
          <ul className="font-light list-none space-y-2">
            <li>+91-8112450779</li>
            <li>singhelboyankit@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr className=" mt-5" />
      <div className="copyright text-center text-light opacity-70">
        <p>Copyright 2024 © YummyBento.com - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
