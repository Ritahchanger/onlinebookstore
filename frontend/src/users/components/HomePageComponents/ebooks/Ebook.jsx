import React from "react";

const Ebook = () => {
  return (
    <div className="ebook">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="small-header">ebook</p>
            <p className="medium-header">
              Access, Read, Practise & Engage
              <br />
              with Digital Content (eBook)
            </p>
            <p className="description">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              soluta facere tempora quia quaerat distinctio suscipit tenetur rem
              temporibus officia veniam facilis, alias eveniet aut, porro sunt
              obcaecati provident corporis laudantium quam, corrupti est
              quisquam? Voluptates delectus necessitatibus blanditiis id.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="img-fluid" // Bootstrap class to make image responsive
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ebook;
