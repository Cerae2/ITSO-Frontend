import React from 'react';
import Header from "../../../components/header/Header";
import './Ourservices.css';

function OurServices() {
 const services = [
    {
      title: 'IP Consultancy & Mentoring',
      description: 'This service involves providing guidance and advice to individuals or businesses regarding intellectual property (IP) matters. Consultants offer expertise in various aspects of IP law and strategy, helping clients navigate issues such as patents, trademarks, copyrights, and trade secrets. Mentoring may involve ongoing support and education to help clients better understand and manage their IP assets.',
    },
    {
      title: 'IP Audit',
      description: 'An IP audit is a comprehensive review and analysis of an organization intellectual property portfolio. This service assesses the strengths, weaknesses, and potential risks associated with existing IP assets. It helps businesses understand the value of their intellectual property, identify opportunities for protection or monetization, and ensure compliance with relevant laws and regulations.',
    },
    {
      title: 'Patent Search',
      description: 'Patent search services involve conducting thorough searches of existing patents and literature to assess the novelty and patentability of a new invention or innovation. This process helps individuals and businesses determine whether their idea or invention meets the criteria for patent protection and identifies any potential conflicts with existing patents.',
    },
    {
      title: 'Patent Draft',
      description: 'Patent drafting involves preparing and drafting the necessary documents and specifications required for filing a patent application with the relevant intellectual property office. This service includes crafting detailed descriptions, claims, and drawings to accurately and effectively protect the invention or innovation..',
    },
    {
      title: 'IP Application',
      description: 'IP application services involve assisting clients in filing applications for various forms of intellectual property protection, such as patents, trademarks, copyrights, and industrial designs. These services help ensure that applications are properly prepared, submitted, and managed throughout the registration process.',
    },
    {
      title: 'IP Clinics, Trainings, Write-shop',
      description: 'IP clinics, trainings, and write-shops are educational programs and workshops designed to raise awareness and build capacity in intellectual property matters. These initiatives provide practical training, guidance, and resources to individuals, businesses, and communities interested in understanding and managing their intellectual property rights effectively.',
    },
    {
      title: 'IP TRL Assessment',
      description: 'Intellectual Property Technology Readiness Level (IP TRL) assessment evaluates the maturity and readiness of a technology or innovation for commercialization and intellectual property protection. This service helps stakeholders assess the feasibility, potential value, and strategic implications of investing in and protecting intellectual property assets at different stages of development.',
    },
 ];

 return (
    <div>
      
    <div>
      <Header />
    </div>
    <div className="services-container">

      <h1>Our Services</h1>
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
 );
}

export default OurServices;
