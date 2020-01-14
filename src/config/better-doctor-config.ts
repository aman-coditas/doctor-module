export class BetterDoctorConfig {
    constructor(
        private userKey = 'a8c80620f26a5763b318d5e1185a227a',
        public slug = '',
        public limit = 10,
    ) {}

    generateURL() {
        return `https://api.betterdoctor.com/2016-03-01/${this.slug}?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=${this.limit}&user_key=${this.userKey}`;
    }
}
