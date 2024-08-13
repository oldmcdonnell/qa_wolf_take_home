const environmentBaseUrl = {
    ci: {
        prefix: '',
        suffix: '',
    },
    local: {
        api: 'https://news.ycombinator.com/newest',
        home: 'https://news.ycombinator.com/',
    },
    production: {
        api: 'https://news.ycombinator.com/newest',
        home: 'https://news.ycombinator.com/',
    },
    staging: {
        api: 'XXXXXXXXXXXXXXXXXXXXX',
        home: '',
    },
};

module.exports = environmentBaseUrl;
