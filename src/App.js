import React from "react";
import Content from "./components/Content";
import Input from "./components/Input";


function App () {
  const [city, setCity] = React.useState("");

  return (
    <section className="vh-100" style={{backgroundColor: "#f5f6f7"}}>
      <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <Input setCity={setCity} />
              <Content
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                city={city}
              />
            </div>
          </div>
      </div>
    </section>
  );
}

export default App;