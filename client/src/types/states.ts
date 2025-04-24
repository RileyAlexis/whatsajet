type OpenSkyState = [
    string | null, // 0 - icao24
    string | null, // 1 - callsign
    string | null, // 2 - origin_country
    number | null, // 3 - time_position
    number | null, // 4 - last_contact
    number | null, // 5 - longitude
    number | null, // 6 - latitude
    number | null, // 7 - baro_altitude
    boolean | null, // 8 - on_ground
    number | null, // 9 - velocity
    number | null, // 10 - true_track
    number | null, // 11 - vertical_rate
    number[] | null, // 12 - sensors
    number | null, // 13 - geo_altitude
    string | null, // 14 - squawk
    boolean | null, // 15 - spi
    number | null  // 16 - position_source
];

export interface OpenSkyStatesResponse {
    time: number;
    states: OpenSkyState[] | null;
}