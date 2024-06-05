import React from "react";
import { ScrollMode, Viewer, Worker } from "@react-pdf-viewer/core";
import {
  RenderSwitchScrollModeProps,
  scrollModePlugin,
} from "@react-pdf-viewer/scroll-mode";
import {
  RenderCurrentScaleProps,
  RenderZoomInProps,
  RenderZoomOutProps,
  zoomPlugin,
} from "@react-pdf-viewer/zoom";

import boot from "../../../assets/files/boot.pdf";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

const PdfViewer = ({ fileUrl = boot }) => {
  console.log("File URL:", fileUrl);

  const scrollModePluginInstance = scrollModePlugin();
  const zoomPluginInstance = zoomPlugin();

  const { SwitchScrollMode } = scrollModePluginInstance;
  const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance;

  const buttonStyle = (isSelected) => ({
    backgroundColor: isSelected ? "#357edd" : "transparent",
    borderColor: isSelected ? "transparent" : "#357edd",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "4px",
    color: isSelected ? "#fff" : "#000",
    cursor: "pointer",
    padding: "8px",
  });

  const zoomButtonStyle = {
    backgroundColor: "#357edd",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    padding: "8px",
  };

  return (
    <div
      style={{
        //border: "1px solid rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          // backgroundColor: "#eeeeee",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "center",
          padding: "4px",
          marginTop:"1rem",
        }}
      >
        <div style={{ padding: "0px 2px" }}>
          <SwitchScrollMode mode={ScrollMode.Vertical}>
            {(props) => (
              <button
                style={buttonStyle(props.isSelected)}
                onClick={props.onClick}
              >
               <i className="fas fa-arrows-alt-v"></i>
              </button>
            )}
          </SwitchScrollMode>
        </div>
        <div style={{ padding: "0px 2px" }}>
          <SwitchScrollMode mode={ScrollMode.Horizontal}>
            {(props) => (
              <button
                style={buttonStyle(props.isSelected)}
                onClick={props.onClick}
              >
              <i className="fas fa-arrows-alt-h"></i>
              </button>
            )}
          </SwitchScrollMode>
        </div>
        <div style={{ padding: "0px 2px" }}>
          <SwitchScrollMode mode={ScrollMode.Wrapped}>
            {(props) => (
              <button
                style={buttonStyle(props.isSelected)}
                onClick={props.onClick}
              >
                Wrapped scrolling
              </button>
            )}
          </SwitchScrollMode>
        </div>
        <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
          <ZoomOut>
            {(props) => (
              <button style={zoomButtonStyle} onClick={props.onClick}>
              <i class="fa-solid fa-magnifying-glass-minus"></i>
              </button>
            )}
          </ZoomOut>
        </div>
        <div style={{ padding: "0px 2px" }}>
          <CurrentScale>
            {(props) => <>{`${Math.round(props.scale * 100)}%`}</>}
          </CurrentScale>
        </div>
        <div style={{ padding: "0px 2px" }}>
          <ZoomIn>
            {(props) => (
              <button style={zoomButtonStyle} onClick={props.onClick}>
                <i class="fa-solid fa-magnifying-glass-plus"></i>
              </button>
            )}
          </ZoomIn>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div style={{ height: "720px" }}>
            <Viewer
              fileUrl={boot}
              plugins={[scrollModePluginInstance, zoomPluginInstance]}
            />
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;
