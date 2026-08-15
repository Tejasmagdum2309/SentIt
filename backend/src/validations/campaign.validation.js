import * as yup from "yup";

import { isValidTimeZone } from "../utils/schedule.util.js";

// Matches a wall-clock time with no offset, e.g. "2026-08-20T10:00".
const WALL_CLOCK_PATTERN = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?$/;

const PAGE_MESSAGE = "page must be a number greater than or equal to 1";
const LIMIT_MESSAGE = "limit must be a number between 1 and 100";
const STATUS_MESSAGE = 'status must be "DRAFT" or "SENT"';

const emptyToUndefined = (value, originalValue) =>
  originalValue === "" ? undefined : value;

export const campaignIdParamSchema = yup.object({
  campaignId: yup.string().trim().required("campaignId is required"),
});

export const campaignEmailParamsSchema = yup.object({
  campaignId: yup.string().trim().required("campaignId is required"),
  emailId: yup.string().trim().required("emailId is required"),
});

export const listCampaignsQuerySchema = yup.object({
  page: yup
    .number()
    .transform(emptyToUndefined)
    .typeError(PAGE_MESSAGE)
    .integer(PAGE_MESSAGE)
    .min(1, PAGE_MESSAGE)
    .default(1),
  limit: yup
    .number()
    .transform(emptyToUndefined)
    .typeError(LIMIT_MESSAGE)
    .integer(LIMIT_MESSAGE)
    .min(1, LIMIT_MESSAGE)
    .max(100, LIMIT_MESSAGE)
    .default(10),
  status: yup
    .string()
    .transform(emptyToUndefined)
    .oneOf(["DRAFT", "SENT", undefined], STATUS_MESSAGE),
});

export const createCampaignBodySchema = yup.object({
  campaignName: yup
    .string()
    .trim()
    .required("campaignName is required")
    .max(100, "campaignName must be 100 characters or fewer"),
  campaignDescription: yup
    .string()
    .trim()
    .max(500, "campaignDescription must be 500 characters or fewer")
    .nullable(),
});

export const updateCampaignBodySchema = yup.object({
  campaignName: yup
    .string()
    .trim()
    .min(1, "campaignName cannot be empty")
    .max(100, "campaignName must be 100 characters or fewer"),
  campaignDescription: yup
    .string()
    .trim()
    .max(500, "campaignDescription must be 500 characters or fewer")
    .nullable(),
  emailSubject: yup
    .string()
    .max(200, "emailSubject must be 200 characters or fewer"),
  emailBody: yup.string(),
});

export const sendCampaignBodySchema = yup.object({
  publishNow: yup
    .boolean()
    .strict(true)
    .typeError("publishNow is required and must be a boolean")
    .required("publishNow is required and must be a boolean"),
  scheduledAt: yup.string().when("publishNow", {
    is: false,
    then: (schema) =>
      schema
        .required("scheduledAt is required when publishNow is false")
        .matches(
          WALL_CLOCK_PATTERN,
          "scheduledAt must be a wall-clock time like 2026-08-20T10:00"
        ),
    otherwise: (schema) => schema.strip(),
  }),
  timeZone: yup.string().when("publishNow", {
    is: false,
    then: (schema) =>
      schema
        .required("timeZone is required when publishNow is false")
        .test(
          "is-iana-time-zone",
          ({ value }) => `timeZone "${value}" is not a valid IANA time zone`,
          (value) => isValidTimeZone(value)
        ),
    otherwise: (schema) => schema.strip(),
  }),
});
