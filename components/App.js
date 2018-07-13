App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function (searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText, function (gif) {
            this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
            });
        }.bind(this));
    },

    getGif: function (searchingText) {
        return new Promise(
            function (resolve, reject) {
                const xhr = newXMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText).data;
                        let gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        } else {
                        reject(new Error(this.statusText));
                    }
                };
                xhr.onerror = function () {
                    reject(new Error(
                        `XMLHttpRequest Error: ${this.statusText}`
                    ));
                };
                xhr.open('GET', url);
                xhr.send();
            }
            }
        )
    },
let url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + 'AeMRGJvfOzX10nFqx1B7OdB9vUYxOZ7W' + '&tag=' + searchingText;
httpGet('url')
    .then(xhr => console.log('Contents: ' + xhr))
    .catch(error => console.error('Something went wrong', error));
        /*
        getGif: function (searchingText, callback) {
        var GIPHY_API_URL = 'https://api.giphy.com';
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + 'AeMRGJvfOzX10nFqx1B7OdB9vUYxOZ7W' + '&tag=' + searchingText;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data;
                var gif = {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);
            }
        };
        xhr.send();
        */
    },

render: function () {

    var styles = {
        margin: '0 auto',
        textAlign: 'center',
        width: '90%'
    };

    return (
        <div style={styles}>
            <h1>Wyszukiwarka GIFow!</h1>
            <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
            <Search
                onSearch={this.handleSearch}
            />
            <Gif
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
        </div>
    );
}
});