import TextField from "@material-ui/core/TextField";

function Table(props) {
  var tableRows = [];
  for (var i = 0; i < props.englishWords.length; i++) {
    tableRows.push(
      <tr key={i}>
        <td>{props.englishWords[i]}</td>
        <td>
          <TextField />;
        </td>
      </tr>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>English</th>
          <th>Finnish</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

export default Table;
