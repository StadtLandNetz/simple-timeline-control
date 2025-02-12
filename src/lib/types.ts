export type TimelineItem = {
    id: string;
    name: string;
    pickup_dropoff_minutes?: number;
    maximum_travel_duration_in_minutes?: number;
    maximum_waiting_time_in_minutes?: number;
    waypoint_index?: number;

    pickup_arrival_time: Date;
    pickup_departure_time: Date;

    pickup_time_window_start: Date;
    pickup_time_window_end: Date;

    dropoff_time_window_start: Date;
    dropoff_time_window_end: Date;

    dropoff_arrival_time: Date;
    dropoff_departure_time: Date;
};