import type { Meta, StoryObj } from "@storybook/react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Imię</TableHead>
          <TableHead>Nazwisko</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Jan</TableCell>
          <TableCell>Kowalski</TableCell>
          <TableCell>jan@example.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Anna</TableCell>
          <TableCell>Nowak</TableCell>
          <TableCell>anna@example.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
