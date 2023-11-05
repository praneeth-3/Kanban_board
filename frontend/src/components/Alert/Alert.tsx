import "./Alert.css";

function Alert(props: any) {
  if (props?.message) {
    return (
      <div className="alert-box">
        <div className="flex-container">
          <div className="alert-container">
            <div className="modal-body alert-content col-flex center-main">
              <h3 className="title">{props?.title}</h3>
              <p className="description">{props?.message}</p>
              {props?.inputElements?.map((item: any) => {
                return (
                  <div className="form-group" key={item.name}>
                    {item.elmType?.toLowerCase() == "combo" ? (
                      <select
                        className="form-control"
                        name={item.name}
                        value={props.formData[item.name]}
                        onChange={props.onFormUpdate}
                      >
                        {item.comboOptions.map((option: any) => (
                          <option>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={item.inputType || "text"}
                        className="form-control"
                        placeholder={item.name}
                        name={item.name}
                        onChange={props.onFormUpdate}
                        value={props.formData[item.name]}
                      />
                    )}
                  </div>
                );
              })}
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                }}
              >
                {props?.okBtnName && (
                  <button
                    className="btn"
                    onClick={() => {
                      props?.alertOkBtnFunc(props.formData);
                    }}
                  >
                    {props?.okBtnName}
                  </button>
                )}
                <button
                  className="btn"
                  onClick={() => {
                    props.setFormData({});
                    props?.closeAction();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Alert;
