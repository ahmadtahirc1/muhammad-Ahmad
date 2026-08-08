import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/adminAuth";
import { getFile, putFile } from "@/lib/github";
import type { Project } from "@/lib/data";

const PROJECTS_PATH = "src/data/projects.json";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { content } = await getFile(PROJECTS_PATH);
    return NextResponse.json(JSON.parse(content) as Project[]);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newProject = (await req.json()) as Project;
  if (!newProject.slug || !newProject.title) {
    return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
  }

  try {
    const { content, sha } = await getFile(PROJECTS_PATH);
    const projects = JSON.parse(content) as Project[];

    if (projects.some((p) => p.slug === newProject.slug)) {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 409 }
      );
    }

    projects.push(newProject);
    const updated = JSON.stringify(projects, null, 2) + "\n";
    await putFile(
      PROJECTS_PATH,
      Buffer.from(updated, "utf-8").toString("base64"),
      sha,
      `Add project: ${newProject.title}`
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
