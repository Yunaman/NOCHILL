import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "string",
      options: {
        list: [
          { title: "Drop 001", value: "drop-001" },
          { title: "Drop 002", value: "drop-002" },
          { title: "Archive",  value: "archive"  },
          { title: "Core",     value: "core"      },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "🟢 Live",       value: "live" },
          { title: "🟡 Low Stock",  value: "low"  },
          { title: "🔴 Sold Out",   value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "live",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "price",
      title: "Price (GBP)",
      type: "number",
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: "dropNumber",
      title: "Drop Number",
      type: "number",
      description: "e.g. 1 for 001",
      validation: (R) => R.required().integer().positive(),
    }),
    defineField({
      name: "dropTotal",
      title: "Drop Total (edition size)",
      type: "number",
      description: "e.g. 100 for a run of 100 pieces",
      validation: (R) => R.required().integer().positive(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "First image = main. Second image = hover swap.",
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["XS", "S", "M", "L", "XL", "XXL", "One Size"],
        layout: "grid",
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "string",
      description: "e.g. 400gsm heavyweight cotton jersey",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower number = appears first",
    }),
  ],
  preview: {
    select: {
      title:  "name",
      media:  "images.0",
      status: "status",
      price:  "price",
    },
    prepare({ title, media, status, price }) {
      const emoji = status === "live" ? "🟢" : status === "low" ? "🟡" : "🔴";
      return {
        title:    `${emoji} ${title}`,
        subtitle: `£ ${price}`,
        media,
      };
    },
  },
});
