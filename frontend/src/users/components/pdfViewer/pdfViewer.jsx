import React, { useState } from "react";
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
import {
  RenderHighlightTargetProps,
  highlightPlugin,
  MessageIcon,
} from "@react-pdf-viewer/highlight"; // Import highlight related components and methods

import { Tooltip, Position, Button } from "@react-pdf-viewer/core";


import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

import { closeReadBookModal } from "../../Redux/features/readBookModalSlice";

import { useSelector, useDispatch } from "react-redux";

const PdfViewer = ({ fileUrl}) => {
  const dispatch = useDispatch();

  const displayReadBookModal = useSelector(
    (state) => state.readModal.displayReadBookModal
  );

  const scrollModePluginInstance = scrollModePlugin();
  const zoomPluginInstance = zoomPlugin();
  const highlightPluginInstance = highlightPlugin(); // Initialize highlight plugin

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

  // Rendering function for the highlight target
  const renderHighlightTarget = (props) => (
    <div
      style={{
        background: "#eee",
        display: "flex",
        position: "absolute",
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: "translate(0, 8px)",
        zIndex: 1,
      }}
    >
      <Tooltip
        position={Position.TopCenter}
        target={
          <Button onClick={props.toggle}>
            <MessageIcon />
          </Button>
        }
        content={() => <div style={{ width: "100px" }}>Add a note</div>}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );

  const closeBookModal = () => {
    dispatch(closeReadBookModal());
  };

  const selectedBook = useSelector((state) => state.readModal.selectedBook);

  console.log(selectedBook);

  return (
    <div
      className={`book_view_modal ${displayReadBookModal ? "active" : null}`}
    >
      <p className="close-icon" onClick={closeBookModal}>
        &times;
      </p>
      
      {selectedBook && (
        <p className="medium-header book_modal">{selectedBook.title}</p>
      )}

      <div
        style={{
          // border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          // background:"green",
          marginTop: "1rem",
         
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            padding: "4px",
            boxShadow:"0 0 5px rgba(0,0,0,0.25)"
            // background:"green"
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
                  <i className="fas fa-exchange-alt"></i>
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
              {selectedBook && (
                <Viewer
                  fileUrl={`http://localhost:5000/upload/books/${selectedBook.book}`}
                  plugins={[
                    scrollModePluginInstance,
                    zoomPluginInstance,
                    highlightPluginInstance,
                  ]} // Include highlight plugin
                />
              )}
            </div>
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
