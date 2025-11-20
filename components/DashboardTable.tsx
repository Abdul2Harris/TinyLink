"use client";
import { CopyOutlined } from "@ant-design/icons";
// import Stats from "@/app/code/[code]/page";
import {
  Button,
  message,
  Modal,
  notification,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import AddLinkForm from "./AddLinkForm";

export default function DashboardTable({ links }: any) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [api, contextHolder] = notification.useNotification();

  const handleDelete = async (code: string) => {
    setDeleting(code);
    try {
      const res = await fetch(`/api/links/${code}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        api.error({
          message: "Delete Failed",
          description: data?.error || "Failed to delete link",
          placement: "topRight",
        });
        return;
      }

      api.success({
        message: "Link Deleted",
        description: `Short link "${code}" has been deleted successfully.`,
        placement: "topRight",
        duration: 2,
      });

      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error) {
      api.error({
        message: "Network Error",
        description: "Please check your connection and try again.",
        placement: "topRight",
      });
    } finally {
      setDeleting(null);
    }
  };

  const columns: TableColumnsType<any> = [
    {
      title: "short code",
      dataIndex: "code",
      sorter: (a: any, b: any) => a.code.localeCompare(b.code),
      render: (code: any) => {
        return (
          <div className="flex gap-2">
            <Link
              href={`/${code}`}
              target="_blank"
              className="text-blue-600 underline"
            >
              {`TinyLink/${code}`}
            </Link>

            <Tooltip title="Copy link">
              <Button
                type="text"
                icon={<CopyOutlined size={18} />}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/${code}`
                  );
                  message.success("Copied!");
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "URL",
      dataIndex: "url",
      render: (url: string) => (
        <Tooltip title={url}>
          <span className="block max-w-[220px] truncate">{url}</span>
        </Tooltip>
      ),
      sorter: (a: any, b: any) => a.url.localeCompare(b.url),
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
      width: 100,
      sorter: (a: any, b: any) => a.clicks - b.clicks,
    },
    {
      title: "Last Clicked",
      dataIndex: "lastClicked",
      render: (date: string | number | Date) =>
        date ? new Date(date).toLocaleString() : "—",
      sorter: (a: any, b: any) =>
        new Date(a.lastClicked || 0).getTime() -
        new Date(b.lastClicked || 0).getTime(),
    },
    {
      title: "Actions",
      width: 140,
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <Tooltip className="View Stats">
            <Button
              size="small"
              onClick={() => router.push(`/code/${record.code}`)}
            >
              View
            </Button>
          </Tooltip>
          <Tooltip className="Delete Link">
            <Button
              size="small"
              danger
              loading={deleting === record.code}
              onClick={() => handleDelete(record.code)}
            >
              Delete
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        dataSource={links}
        columns={columns}
        locale={{
          emptyText: (
            <span className="text-sm text-gray-500">No Links Created Yet</span>
          ),
        }}
        loading={!links}
        pagination={false}
        bordered
        rowKey="code"
        className="rounded-md"
        scroll={{ x: "max-content" }}
      />
    </>
  );
}
