export const writeToClipboard=(text:string) =>{
  navigator.clipboard.writeText(text).then(function() {
      console.log('文本已成功复制到剪切板');
  }).catch(function(err) {
      console.error('无法复制文本到剪切板: ', err);
  });
}
