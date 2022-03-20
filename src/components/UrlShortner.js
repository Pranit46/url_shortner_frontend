import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import axios from "axios";
import "../styles/Registration.css";

function UrlShortner() {
  const initialValues = { full: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  let [url, setUrl] = useState([]);
  let [id, setId] = useState();
  console.log(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (isSubmit) {
      try {
        let res = await axios.post(`${env.API_URL}/shortUrl/creatshorturl`, formValues);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
   
    if (!values.email) {
      errors.email = "Email is required!";
    } 
    return errors;
  };

  useEffect(() => {
    getUrl();
  }, [formErrors]);
  console.log(url);
  console.log(env.API_URL);

  const getUrl = () => {
     axios
      .get(`${env.API_URL}/shortUrl/geturl`)
      .then((res) => {
        // console.log(res.data);
        setUrl(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const incClicks = async() => {
     await axios
      .get(`${env.API_URL}/shortUrl/click/${id}`)
      .then((res) => {
        // console.log(res.data);
        setUrl(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>URL shortner</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>
                <h4>URL</h4>
              </label>
              <input type="text" name="full" placeholder="URL" value={formValues.full}  onChange={handleChange}/>
              <p className="error_message">{formErrors.full}</p>
            </div>
            <button className="btn btn-lg btn-danger">Shink</button>
          </div>
        </form>

        <div className="tableMain my-4">
          <table className="table table-striped table-resposive">
            <thead>
              <tr>
                <th>Full URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {url &&
                url.length > 0 &&
                url.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <a href={e.full} target="_blank" rel="noreferrer">
                          {e.full}
                        </a>
                      </td>
                      <td>
                        <a
                          href={e.full}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setId(e._id)
                            incClicks()
                            getUrl();
                        }}
                        >
                          {e.short}
                        </a>
                      </td>
                      <td>{e.clicks}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UrlShortner;
