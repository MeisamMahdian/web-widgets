CKEDITOR.dialog.add("browseImageDialog", function (editor) {
    return {
        title: "Upload Image",
        minWidth: 400,
        minHeight: 200,

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
                            var dialogObj = this.getDialog();
                            dialogObj.newFile = fileInput.$.files[0];
                            dialogObj.getContentElement("tab-upload", "alt").setValue(dialogObj.newFile.name);
                        }
                    },
                    // {
                    //     type: 'button',
                    //     id: 'fileId',
                    //     label: 'Upload file',
                    //     onClick: function( e ) {
                    //         // preview
                    //     }
                    // },
                    {
                        type: "text",
                        id: "alt",
                        label: "Image Description"
                    },
                    {
                        type: "text",
                        id: "width",
                        label: "Width"
                    },
                    {
                        type: "text",
                        id: "height",
                        label: "Height"
                    }
                ]
            }
        ],
        onShow: function () {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            if (element) element = element.getAscendant("img", true);

            if (!element || element.getName() != "img") {
                element = editor.document.createElement("img");
                this.insertMode = true;
            } else this.insertMode = false;

            this.element = element;
            if (!this.insertMode) this.setupContent(this.element);
        },
        onOk: function () {
            var dialogObj = this;
            if (dialogObj.newFile) {
                var image = this.element;
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
