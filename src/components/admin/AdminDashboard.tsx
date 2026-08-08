"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/data";

type FormState = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string;
  stack: string;
  liveUrl: string;
  githubUrl: string;
  highlight: string;
  featured: boolean;
};

const emptyForm: FormState = {
  slug: "",
  title: "",
  description: "",
  longDescription: "",
  tags: "",
  stack: "",
  liveUrl: "",
  githubUrl: "",
  highlight: "",
  featured: false,
};

function toFormState(p: Project): FormState {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    longDescription: p.longDescription,
    tags: p.tags.join(", "),
    stack: p.stack.join(", "),
    liveUrl: p.liveUrl ?? "",
    githubUrl: p.githubUrl ?? "",
    highlight: p.highlight ?? "",
    featured: p.featured,
  };
}

function toProject(f: FormState): Project {
  return {
    slug: f.slug.trim(),
    title: f.title.trim(),
    description: f.description.trim(),
    longDescription: f.longDescription.trim(),
    tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
    stack: f.stack.split(",").map((t) => t.trim()).filter(Boolean),
    liveUrl: f.liveUrl.trim() || undefined,
    githubUrl: f.githubUrl.trim() || undefined,
    highlight: f.highlight.trim() || undefined,
    featured: f.featured,
  };
}

const inputClass =
  "w-full rounded-lg border border-border bg-surface-hover px-3.5 py-2 text-sm outline-none focus:border-accent/50";

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeStatus, setResumeStatus] = useState("");

  const loadProjects = async () => {
    setLoadError("");
    const res = await fetch("/api/admin/projects");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoadError(data.error || "Failed to load projects.");
      return;
    }
    setProjects(await res.json());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time fetch on mount
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (p: Project) => {
    setEditingSlug(p.slug);
    setForm(toFormState(p));
    setFormError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startCreate = () => {
    setEditingSlug(null);
    setForm(emptyForm);
    setFormError("");
    setNotice("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    setNotice("");

    const project = toProject(form);
    if (!project.slug || !project.title) {
      setFormError("Slug and title are required.");
      setSaving(false);
      return;
    }

    const res = editingSlug
      ? await fetch(`/api/admin/projects/${editingSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(project),
        })
      : await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(project),
        });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFormError(data.error || "Save failed.");
      return;
    }

    setNotice("Saved — Vercel will redeploy automatically, live in about a minute.");
    startCreate();
    loadProjects();
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete "${slug}"? This can't be undone.`)) return;
    const res = await fetch(`/api/admin/projects/${slug}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoadError(data.error || "Delete failed.");
      return;
    }
    setNotice("Deleted — Vercel will redeploy automatically, live in about a minute.");
    loadProjects();
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    setResumeUploading(true);
    setResumeStatus("");
    const body = new FormData();
    body.append("file", resumeFile);
    const res = await fetch("/api/admin/resume", { method: "POST", body });
    setResumeUploading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setResumeStatus(data.error || "Upload failed.");
      return;
    }
    setResumeStatus("Uploaded — live in about a minute after Vercel redeploys.");
    setResumeFile(null);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-bg px-6 py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium" style={{ fontFamily: "var(--font-display)" }}>
            Admin
          </h1>
          <button
            onClick={handleLogout}
            className="rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            Log out
          </button>
        </div>

        {notice && (
          <div className="rounded-lg border border-accent/30 bg-accent-tint px-4 py-3 text-sm text-accent">
            {notice}
          </div>
        )}

        {/* Resume upload */}
        <section className="card rounded-2xl p-6">
          <h2 className="mb-1 text-lg font-medium" style={{ fontFamily: "var(--font-display)" }}>
            Resume
          </h2>
          <p className="mb-4 text-sm text-muted">
            Uploading replaces the PDF at <code>/resume.pdf</code> that the Download Resume
            button links to.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
              className="text-sm"
            />
            <button
              onClick={handleResumeUpload}
              disabled={!resumeFile || resumeUploading}
              className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent disabled:opacity-50"
            >
              {resumeUploading ? "Uploading…" : "Upload"}
            </button>
          </div>
          {resumeStatus && <p className="mt-3 text-sm text-muted">{resumeStatus}</p>}
        </section>

        {/* Project form */}
        <section className="card rounded-2xl p-6">
          <h2 className="mb-4 text-lg font-medium" style={{ fontFamily: "var(--font-display)" }}>
            {editingSlug ? `Edit "${editingSlug}"` : "Add a project"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                placeholder="Slug (e.g. my-new-project)"
                value={form.slug}
                disabled={!!editingSlug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className={inputClass + (editingSlug ? " opacity-60" : "")}
              />
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
            </div>
            <textarea
              placeholder="Short description (shown on the project card)"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className={inputClass}
            />
            <textarea
              placeholder="Long description (shown in the case-study modal)"
              value={form.longDescription}
              onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
              rows={3}
              className={inputClass}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                placeholder="Tags, comma separated"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Tech stack, comma separated"
                value={form.stack}
                onChange={(e) => setForm({ ...form, stack: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                placeholder="Live URL (optional)"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="GitHub URL (optional)"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className={inputClass}
              />
            </div>
            <input
              placeholder="Highlight badge (optional, e.g. 'Used by 6+ clients')"
              value={form.highlight}
              onChange={(e) => setForm({ ...form, highlight: e.target.value })}
              className={inputClass}
            />
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Featured
            </label>

            {formError && <p className="text-sm text-red-600">{formError}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent disabled:opacity-50"
              >
                {saving ? "Saving…" : editingSlug ? "Save changes" : "Add project"}
              </button>
              {editingSlug && (
                <button
                  type="button"
                  onClick={startCreate}
                  className="rounded-full border border-border px-5 py-2 text-sm text-muted hover:text-foreground"
                >
                  Cancel edit
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Existing projects */}
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-medium" style={{ fontFamily: "var(--font-display)" }}>
            Existing projects
          </h2>
          {loadError && <p className="text-sm text-red-600">{loadError}</p>}
          {!projects && !loadError && <p className="text-sm text-muted">Loading…</p>}
          {projects?.map((p) => (
            <div
              key={p.slug}
              className="card flex items-center justify-between gap-4 rounded-xl px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium">{p.title}</p>
                <p className="text-xs text-muted-2">{p.slug}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => startEdit(p)}
                  className="rounded-full border border-border px-4 py-1.5 text-xs text-muted hover:text-foreground"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.slug)}
                  className="rounded-full border border-border px-4 py-1.5 text-xs text-muted hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
