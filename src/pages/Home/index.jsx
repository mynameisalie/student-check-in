import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import FaceDetection from "@/components/templates/FaceDetection/FaceDetection.jsx";
import ContainerCustom from "@/components/atoms/ContainerCustom/index.js";
import Location from "@/components/templates/Location/Location.jsx";

const Home = () => {
  const { theme, setTheme } = useTheme();
  const [studentInfo, setStudentInfo] = useState(null);
  const [validFaceDetection, setValidFaceDetection] = useState(false);
  const [validDistance, setValidDistance] = useState(false);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };
  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ContainerCustom>
      <div className="my-3">
        <Button onClick={() => changeTheme()}>Change to {theme === "light" ? "Dark" : "Light"}</Button>
      </div>

      <div>
        <h1>Student Check-In</h1>

        <FaceDetection validFaceDetection={validFaceDetection} setValidFaceDetection={setValidFaceDetection} />

        {validFaceDetection && (
          <>
            <Location setValidDistance={setValidDistance} />

            <ContainerCustom>
              {validDistance ? (
                <form onSubmit={handleSubmit}>
                  <div>
                    <p>You are within the 1 km radius of the school.</p>
                    <label>
                      Student Name:
                      <input type="text" name="name" value={studentInfo?.name || ""} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                      Student ID:
                      <input type="text" name="id" value={studentInfo?.id || ""} onChange={handleInputChange} />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                  </div>
                </form>
              ) : (
                <p>You are not within the 1 km radius of the school.</p>
              )}
            </ContainerCustom>
          </>
        )}
      </div>
    </ContainerCustom>
  );
};

export default Home;
