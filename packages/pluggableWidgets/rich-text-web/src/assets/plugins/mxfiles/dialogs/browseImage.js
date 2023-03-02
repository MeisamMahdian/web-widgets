CKEDITOR.dialog.add("browseImageDialog", function (editor) {
    return {
        title: "Upload Image",
        minWidth: 400,
        minHeight: 300,

        contents: [
            {
                id: "tab-upload",
                label: "Upload",
                elements: [
                    {
                        type: "file",
                        id: "upload",
                        label: "Select file from your computer",
                        size: 38,
                        onChange: function (e) {
                            const fileInput = this.getInputElement();
                            if (!fileInput || !fileInput.$.files) {
                                return;
                            }
                            const dialogObj = this.getDialog();
                            dialogObj.newFile = fileInput.$.files[0];
                            dialogObj.getContentElement("tab-upload", "alt").setValue(dialogObj.newFile.name);
                        }
                    },
                    {
                        type: "text",
                        id: "alt",
                        label: "Image Description"
                    },
                    {
                        type: "hbox",
                        widths: ["50%", "50%"],
                        children: [
                            {
                                type: "text",
                                id: "width",
                                label: "Width",
                                default: "100%"
                            },
                            {
                                type: "text",
                                id: "height",
                                label: "Height"
                            }
                        ]
                    }
                ]
            },
            {
                id: "tab-browse",
                label: "Browse",
                elements: [
                    {
                        type: "html",
                        id: "browse",
                        html: '<div id="browseContainer"></div>'
                    },
                    {
                        type: "text",
                        id: "alt",
                        label: "Image Description"
                    },
                    {
                        type: "hbox",
                        widths: ["50%", "50%"],
                        children: [
                            {
                                type: "text",
                                id: "width",
                                label: "Width",
                                default: "100%"
                            },
                            {
                                type: "text",
                                id: "height",
                                label: "Height"
                            }
                        ]
                    }
                ]
            }
        ],
        onShow: function () {
            const dialogObj = this;
            const selection = editor.getSelection();
            let targetElement = selection.getStartElement();
            if (targetElement) targetElement = targetElement.getAscendant("img", true);
            if (!targetElement || targetElement.getName() != "img") {
                targetElement = editor.document.createElement("img");
                dialogObj.insertMode = true;
            } else dialogObj.insertMode = false;

            dialogObj.imageElement = targetElement;
            if (!dialogObj.insertMode) this.setupContent(dialogObj.imageElement);
        },
        onLoad: function () {
            const dialogObj = this;
            this.on("selectPage", function (ev) {
                if (ev.data.page != "tab-browse") {
                    dialogObj.imageMode = "upload";
                    return;
                }
                dialogObj.imageMode = "browse";
                const document = this.getElement().getDocument();
                const container = document.getById("browseContainer");
                let content = "";
                if (editor.mx_images && editor.mx_images.length > 0) {
                    editor.mx_images.forEach(guid => {
                        content += `<div onclick="this.getElementsByTagName('input')[0].checked=true">
                            <input type="radio" name="selectedImage" value="${guid}"//>
                            <img src="/file?guid=${guid}" style="max-width:200px;" /></div>`;
                    });
                } else {
                    content = "no image is available";
                }
                container.setHtml(content);
            });
        },
        onOk: function (ev) {
            const dialogObj = this;
            if (dialogObj.imageMode === "browse") {
                const document = this.getElement().getDocument();
                const container = document.getById("browseContainer");
                const inputItems = Array.from(container.getElementsByTag("input").$);
                const selectedInput = inputItems.find(input => input.checked);
                const guid = selectedInput.value;

                const image = dialogObj.imageElement;
                this.commitContent(image);

                if (this.insertMode) editor.insertElement(image);

                image.setAttribute("src", `/file?guid=${guid}`);
                image.setAttribute("width", dialogObj.getValueOf("tab-browse", "width"));
                image.setAttribute("height", dialogObj.getValueOf("tab-browse", "height"));
                image.setAttribute("alt", dialogObj.getValueOf("tab-browse", "alt"));
            } else if (dialogObj.newFile) {
                const image = dialogObj.imageElement;
                this.commitContent(image);

                if (this.insertMode) editor.insertElement(image);

                image.setAttribute("src", URL.createObjectURL(dialogObj.newFile));
                image.setAttribute("width", dialogObj.getValueOf("tab-upload", "width"));
                image.setAttribute("height", dialogObj.getValueOf("tab-upload", "height"));
                image.setAttribute("alt", dialogObj.getValueOf("tab-upload", "alt"));

                editor.fire("mx_upload_image", dialogObj.newFile);
            }
        }
    };
});
