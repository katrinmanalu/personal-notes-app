import React from 'react';

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    const val = event.target.value;
    this.setState({ keyword: val });
    this.props.onSearch(val);
  }

  handleClear() {
    this.setState({ keyword: '' });
    this.props.onSearch('');
  }

  render() {
    const { keyword } = this.state;
    return (
      <div className="note-search" data-testid="note-search">
        <input
          type="text"
          placeholder="Cari berdasarkan judul ..."
          value={keyword}
          onChange={this.handleChange}
          data-testid="note-search-input"
        />
        {keyword && (
          <button
            className="note-search__clear"
            type="button"
            onClick={this.handleClear}
          >
            &times;
          </button>
        )}
      </div>
    );
  }
}

export default NoteSearch;
