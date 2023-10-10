/* eslint-disable */
import React, { useEffect, useState } from 'react';

export default function Editor(props) {
  const { editorHtml, placeholder, onChange } = props;
  const [textarea, settextarea] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      settextarea(true);
      window.tinymce.init({
        selector: '.kt-tinymce-4',
        height: 400,
        theme: 'modern',
        menubar: 'file edit view insert format tools table tc help',
        toolbar: [
          'styleselect fontselect fontsizeselect',
          'undo redo | cut copy paste | bold italic | link image | alignleft aligncenter alignright alignjustify',
          'bullist numlist | outdent indent | blockquote subscript superscript | advlist | autolink | lists charmap | print preview |  code',
        ],
        plugins: 'advlist autolink link image lists charmap print preview code',
      });

      window.tinymce.activeEditor.on('change', () => {
        onChange(window.tinymce.activeEditor.getContent());
      });
    }, 10);

    // return () => window.tinymce.remove('.kt-tinymce-4');
  }, []);

  return (
    <div>
      <div>
        {textarea && (
          <textarea
            placeholder={placeholder}
            className='kt-tinymce-4'
            onChange={onChange}
          >
            {editorHtml}
          </textarea>
        )}
      </div>
    </div>
  );
}

Editor.defaultProps = {
  placeholder: 'Write something...',
};
