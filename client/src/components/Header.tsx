import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { updateSwitchBtn } from "@/redux/slices/compilerSlice";
import "./Header.css";
import { useState } from "react";

export default function Header() {
  const [activeTab, setActiveTab] = useState("Code");
  const dispatch = useDispatch();

  const handleSwitch = (option: "Code" | "Output") => {
    setActiveTab(option);
    dispatch(updateSwitchBtn(option));
  };
  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <h2 className="font-bold select-none">Dev Compiler</h2>
      </Link>
      <div className="switchBtn bg-gray-800">
        <Button
          variant={activeTab == "Code" ? "default" : "secondary"}
          onClick={() => handleSwitch("Code")}
          className={activeTab === "Code" ? "activeTab" : ""}
        >
          Code
        </Button>
        <Button
          variant={activeTab == "Output" ? "default" : "secondary"}
          onClick={() => handleSwitch("Output")}
        >
          Output
        </Button>
      </div>
      <ul className="flex gap-2">
        <li>
          <Link to="/compiler">
            <Button variant="secondary">Compiler</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
