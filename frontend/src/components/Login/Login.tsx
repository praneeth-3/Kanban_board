import "./Login.css";

function Login(props: any) {
  return (
    <div
      className="modal fade"
      id="myModal"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content clearfix">
          <div className="modal-body">
            <div className="modal-body">
              <h3 className="title">Login Form</h3>
              <p className="description">Login here Using Name & Password</p>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="name"
                  onChange={props.onFormUpdate}
                  value={props.formData.name}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={props.onFormUpdate}
                  value={props.formData.password}
                />
              </div>
              <button className="btn" onClick={props.loginUser}>
                Login / Signin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
