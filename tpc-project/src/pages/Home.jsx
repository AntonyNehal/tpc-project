import React from "react";

function Home() {
  return (
    <div className="p-6">
      {/* Home Section */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-center">Welcome to TPC Home</h1>
        <p className="mt-4 text-lg text-center">
          This is the home page of the Training and Placement Cell.
        </p>
      </section>

      {/* About Section */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-center">About Us</h1>
        <p className="mt-4 text-lg text-center">
          The Training and Placement Cell aims to provide the best career opportunities to students.
        </p>
      </section>

      {/* Contact Section */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-center">Contact Us</h1>
        <p className="mt-4 text-center">Email: tpc@college.edu</p>
        <p className="text-center">Phone: +123 456 7890</p>
      </section>

      {/* Calendar Section */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-center">TPC Calendar</h1>
        <p className="mt-4 text-center">Upcoming events and placement drives will be listed here.</p>
      </section>
    </div>
  );
}

export default Home;
