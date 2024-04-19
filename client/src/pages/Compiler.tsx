import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import RenderCode from "@/components/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { baseUrl } from "@/utils/baseURL";
import { RootState } from "@/redux/store";
export default function Compiler() {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const { urlId } = useParams();
  const dispatch = useDispatch();

  const switchBt = useSelector(
    (state: RootState) => state.compilerSlice.switchBtn
  );
  const loadCode = async () => {
    try {
      const response = await axios.post(`${baseUrl}/compiler/load`, {
        urlId: urlId,
      });
      dispatch(updateFullCode(response.data.fullCode));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 500) {
          toast("Invalid URL, Default Code Loaded");
        }
      }
      handleError(error);
    }
  };

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
    const handleResize = () => {
      setwindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [urlId]);

  return windowWidth < 770 ? (
    <ResizablePanelGroup direction="horizontal">
      {switchBt == "Code" ? (
        <>
          <ResizablePanel
            className="code h-[calc(100dvh-60px)] min-w-[350px]"
            defaultSize={50}
          >
            <HelperHeader />
            <CodeEditor />
          </ResizablePanel>
          <ResizableHandle />
        </>
      ) : (
        <>
          <ResizablePanel
            className="output h-[calc(100dvh-60px)] min-w-[350px]"
            defaultSize={50}
          >
            <RenderCode />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  ) : (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        className="code h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="output h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
