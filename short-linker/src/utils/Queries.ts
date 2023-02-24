const INSERT = "INSERT INTO shortlinker (link, url) VALUES (?, ?)";
const SELECT = "SELECT url FROM shortlinker WHERE link = ?";

export { INSERT, SELECT }