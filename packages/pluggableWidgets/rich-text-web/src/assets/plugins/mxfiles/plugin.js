CKEDITOR.plugins.add("mxfiles", {
    icons: "mxfiles",
    init: function (editor) {
        editor.ui.addButton("mxfiles", {
            label: "Insert Image",
            command: "insertImage",
            toolbar: "insert"
        });

        editor.addCommand("insertImage", new CKEDITOR.dialogCommand("browseImageDialog"));
        CKEDITOR.dialog.add("browseImageDialog", this.path + "dialogs/browseImage.js");
    }
});
