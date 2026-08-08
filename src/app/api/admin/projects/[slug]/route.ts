import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/adminAuth";
import { getFile, putFile } from "@/lib/github";
import type { Project } from "@/lib/data";

const PROJECTS_PATH = "src/data/projects.json";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const updates = (await req.json()) as Partial<Project>;

  try {
    const { content, sha } = await getFile(PROJECTS_PATH);
    const projects = JSON.parse(content) as Project[];
    const idx = projects.findIndex((p) => p.slug === slug);
    if (idx === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projects[idx] = { ...projects[idx], ...updates };
    const updated = JSON.stringify(projects, null, 2) + "\n";
    await putFile(
      PROJECTS_PATH,
      Buffer.from(updated, "utf-8").toString("base64"),
      sha,
      `Update project: ${projects[idx].title}`
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const { content, sha } = await getFile(PROJECTS_PATH);
    const projects = JSON.parse(content) as Project[];
    const filtered = projects.filter((p) => p.slug !== slug);
    if (filtered.length === projects.length) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const updated = JSON.stringify(filtered, null, 2) + "\n";
    await putFile(
      PROJECTS_PATH,
      Buffer.from(updated, "utf-8").toString("base64"),
      sha,
      `Remove project: ${slug}`
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
