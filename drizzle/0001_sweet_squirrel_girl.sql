CREATE TABLE `profileFetchRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fbid` varchar(32) NOT NULL,
	`status` enum('pending','fulfilled','timed_out') NOT NULL DEFAULT 'pending',
	`fullName` text,
	`jobTitle` text,
	`team` text,
	`manager` text,
	`location` text,
	`email` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`fulfilledAt` timestamp,
	CONSTRAINT `profileFetchRequests_id` PRIMARY KEY(`id`)
);
