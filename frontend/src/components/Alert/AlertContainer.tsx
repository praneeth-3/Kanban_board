import { useEffect, useState } from "react";
import "./Alert.css";
import Alert from "./Alert";

function AlertContainer(props: any) {
  const [formData, setFormData] = useState<any>({});
  const onFormUpdate = (evt: any) => {
    let _formData = { ...formData };
    if (evt.target.name) {
      _formData[evt.target.name as keyof Object] = evt.target.value;
    }
    setFormData(_formData);
  };
  useEffect(() => {
    if (!props || !props.message) props?.closeAction();
  }, [props?.message]);
  useEffect(() => {
    if (props?.inputElements) {
      let _formData = { ...formData };
      props.inputElements.forEach((element: any) => {
        if (element) {
          _formData[element.name] = element.value;
        }
      });
      setFormData(_formData);
    }
  }, [props.inputElements]);

  return (
    <Alert
      {...props}
      formData={formData}
      onFormUpdate={onFormUpdate}
      setFormData={setFormData}
    />
  );
}

export default AlertContainer;
