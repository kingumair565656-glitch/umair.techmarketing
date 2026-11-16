import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  ExternalLink,
  Upload,
  X,
  Pencil,
  Trash2,
  Eye,
} from 'lucide-react';
import {
  ProjectItem,
  ServiceCategory,
  compressImageFile,
} from '../types/portfolio';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onAddProject: (project: Omit<ProjectItem, 'id' | 'createdAt'>) => void;
  onUpdateProject: (project: ProjectItem) => void;
  onDeleteProject: (id: string) => void;
}

const CATEGORIES: ('All' | ServiceCategory)[] = [
  'All',
  'Meta Ads Management',
  'Website Design',
  'Social Media Marketing',
];

const DEFAULT_CATEGORIES: ServiceCategory[] = [
  'Meta Ads Management',
  'Website Design',
  'Social Media Marketing',
];

const SHOWCASE_VISUALS: Record<
  ServiceCategory,
  { imageUrl: string; title: string; description: string }
> = {
  'Meta Ads Management': {
    imageUrl: '/src/assets/images/project_meta_ads_preview_1794843018189.jpg',
    title: 'Meta Ads Campaign Showcase',
    description:
      'Campaign strategy, Facebook and Instagram ad placements, and audience targeting visuals. Upload your real client campaign screenshot to feature here.',
  },
  'Website Design': {
    imageUrl:
      '/src/assets/images/project_website_design_preview_1794843020620.jpg',
    title: 'Responsive Website Design Showcase',
    description:
      'Business website layout, landing page hierarchy, and UI/UX presentation. Upload your real client website screenshot and live link here.',
  },
  'Social Media Marketing': {
    imageUrl:
      '/src/assets/images/project_social_media_preview_1794843019426.jpg',
    title: 'Social Media Content Showcase',
    description:
      'Content planning, grid aesthetics, and brand growth direction. Upload your real client social media showcase screenshot here.',
  },
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ServiceCategory>(
    'All'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [previewItem, setPreviewItem] = useState<{
    name: string;
    category: ServiceCategory;
    description: string;
    imageUrl: string;
    projectUrl?: string;
  } | null>(null);

  // Modal Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Website Design');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openNewModal = (presetCategory?: ServiceCategory) => {
    setEditingProject(null);
    setName('');
    setCategory(presetCategory || 'Website Design');
    setDescription('');
    setProjectUrl('');
    setImageUrl('');
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    setName(project.name);
    setCategory(project.category);
    setDescription(project.description);
    setProjectUrl(project.projectUrl);
    setImageUrl(project.imageUrl);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (PNG, JPG, or WebP).');
      return;
    }
    try {
      const compressed = await compressImageFile(file, 1280, 0.85);
      setImageUrl(compressed);
      setFormError(null);
    } catch {
      setFormError('Could not process this screenshot. Please try another file.');
    }
    e.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setFormError('Please upload an actual screenshot or image of your project.');
      return;
    }
    if (!name.trim()) {
      setFormError('Please enter the project name.');
      return;
    }
    if (!description.trim()) {
      setFormError('Please enter a short description of the project.');
      return;
    }

    const cleanUrl = projectUrl.trim();
    if (editingProject) {
      onUpdateProject({
        ...editingProject,
        name: name.trim(),
        category,
        description: description.trim(),
        projectUrl: cleanUrl,
        imageUrl,
      });
    } else {
      onAddProject({
        name: name.trim(),
        category,
        description: description.trim(),
        projectUrl: cleanUrl,
        imageUrl,
      });
    }
    setIsModalOpen(false);
  };

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 bg-[#FFF4CC]/25 border-b border-[#111111]/8"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Section Heading & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]/70 mb-2">
              Portfolio Showcase
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight [text-wrap:balance] mb-3">
              Some of My Completed Projects
            </h2>
            <div className="w-16 h-1 bg-[#E8C547] rounded-full mb-3" />
            <p className="text-sm sm:text-base text-[#4A4A4A] max-w-[58ch]">
              Visual project previews across Meta Ads Management, Website Design, and Social Media Marketing. Upload your own client screenshots anytime.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openNewModal()}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Completed Project</span>
          </button>
        </motion.div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by service category"
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#111111] text-white'
                    : 'bg-white text-[#333333] border border-[#111111]/12 hover:bg-[#FFF4CC]'
                }`}
              >
                {cat === 'All' ? 'All Projects' : cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid OR Studio Visual Showcase Slots (with crisp project pictures) */}
        {projects.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEFAULT_CATEGORIES.filter(
              (cat) => selectedCategory === 'All' || selectedCategory === cat
            ).map((cat, idx) => {
              const showcase = SHOWCASE_VISUALS[cat];
              return (
                <motion.article
                  key={cat}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="group rounded-xl bg-white border border-[#111111]/10 overflow-hidden shadow-[0_6px_20px_-10px_rgba(17,17,17,0.1)] hover:border-[#E8C547] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF4CC]/30 border-b border-[#111111]/8">
                      <img
                        src={showcase.imageUrl}
                        alt={`${showcase.title} — ${cat}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="p-6 pb-4">
                      <p className="text-xs font-semibold text-[#111111]/65 mb-1.5">
                        {cat}
                      </p>
                      <h3 className="font-display text-lg font-bold text-[#111111] mb-2">
                        {showcase.title}
                      </h3>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">
                        {showcase.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 mt-2 border-t border-[#111111]/8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewItem({
                          name: showcase.title,
                          category: cat,
                          description: showcase.description,
                          imageUrl: showcase.imageUrl,
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#111111]/70 transition-colors cursor-pointer"
                    >
                      <span>View Project</span>
                      <Eye className="w-4 h-4 text-[#E8C547]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => openNewModal(cat)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#111111] bg-[#FFF4CC] hover:bg-[#E8C547] rounded-md transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Yours</span>
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-xl bg-white border border-[#111111]/10 p-10 text-center">
            <p className="font-display text-lg font-semibold text-[#111111] mb-2">
              No projects uploaded under {selectedCategory} yet
            </p>
            <p className="text-sm text-[#4A4A4A] mb-5">
              Add a completed client project with your original screenshot to feature it in this category.
            </p>
            <button
              type="button"
              onClick={() =>
                openNewModal(
                  selectedCategory === 'All' ? 'Website Design' : selectedCategory
                )
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.38,
                  delay: Math.min(idx * 0.06, 0.24),
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="group rounded-xl bg-white border border-[#111111]/10 overflow-hidden shadow-[0_6px_20px_-10px_rgba(17,17,17,0.1)] hover:border-[#E8C547] transition-colors flex flex-col"
              >
                {/* Project Image Preview */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF4CC]/30 border-b border-[#111111]/8">
                  <img
                    src={project.imageUrl}
                    alt={`${project.name} — ${project.category}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => openEditModal(project)}
                      aria-label={`Edit ${project.name}`}
                      className="w-8 h-8 rounded-md bg-white/95 text-[#111111] hover:bg-[#E8C547] flex items-center justify-center shadow-sm cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteProject(project.id)}
                      aria-label={`Delete ${project.name}`}
                      className="w-8 h-8 rounded-md bg-white/95 text-[#111111] hover:bg-red-600 hover:text-white flex items-center justify-center shadow-sm cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Project Metadata & Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#111111]/65 mb-1.5">
                      {project.category}
                    </p>
                    <h3 className="font-display text-lg font-bold text-[#111111] mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4A4A4A] mb-5">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between gap-3">
                    {project.projectUrl ? (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#111111]/70 transition-colors"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-4 h-4 text-[#E8C547]" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPreviewItem(project)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#111111]/70 transition-colors cursor-pointer"
                      >
                        <span>View Project</span>
                        <Eye className="w-4 h-4 text-[#E8C547]" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setPreviewItem(project)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-md bg-[#FFF4CC] hover:bg-[#E8C547] text-[#111111] transition-colors cursor-pointer"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg rounded-2xl bg-white border border-[#111111]/12 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-4 bg-[#111111] text-white flex items-center justify-between">
                <h3
                  id="project-modal-title"
                  className="font-display text-lg font-bold"
                >
                  {editingProject
                    ? 'Edit Completed Project'
                    : 'Add Completed Project'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-md bg-white/10 hover:bg-[#E8C547] hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                <div>
                  <label className="block text-sm font-semibold text-[#111111] mb-1.5">
                    Project Screenshot / Image
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                  {imageUrl ? (
                    <div className="relative rounded-lg overflow-hidden border border-[#111111]/15 aspect-[16/9] bg-[#FFF4CC]/30">
                      <img
                        src={imageUrl}
                        alt="Uploaded project preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-3 right-3 px-3 py-1.5 text-xs font-semibold bg-[#E8C547] text-[#111111] rounded-md shadow cursor-pointer"
                      >
                        Replace Image
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-8 px-4 rounded-lg border-2 border-dashed border-[#111111]/20 hover:border-[#E8C547] bg-[#FFF4CC]/25 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Upload className="w-6 h-6 text-[#111111]" />
                      <span className="text-sm font-semibold text-[#111111]">
                        Click to upload project screenshot
                      </span>
                      <span className="text-xs text-[#666666]">
                        PNG, JPG, or WebP
                      </span>
                    </button>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="project-name"
                    className="block text-sm font-semibold text-[#111111] mb-1.5"
                  >
                    Project Name
                  </label>
                  <input
                    id="project-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter client project name"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#111111]/20 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="project-category"
                    className="block text-sm font-semibold text-[#111111] mb-1.5"
                  >
                    Service Category
                  </label>
                  <select
                    id="project-category"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as ServiceCategory)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#111111]/20 bg-white focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                  >
                    {DEFAULT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="project-description"
                    className="block text-sm font-semibold text-[#111111] mb-1.5"
                  >
                    Short Description
                  </label>
                  <textarea
                    id="project-description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the scope and deliverables completed for this project"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#111111]/20 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="project-url"
                    className="block text-sm font-semibold text-[#111111] mb-1.5"
                  >
                    View Project Link{' '}
                    <span className="font-normal text-[#666666]">
                      (optional URL)
                    </span>
                  </label>
                  <input
                    id="project-url"
                    type="url"
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#111111]/20 focus:outline-none focus:border-[#111111] focus:ring-2 focus:ring-[#E8C547]"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-xs font-semibold text-red-700">
                    {formError}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-sm font-semibold text-[#111111] bg-[#FFF4CC] hover:bg-[#FFF4CC]/70 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    {editingProject ? 'Save Changes' : 'Save Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Project Lightbox Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-project-title"
            className="fixed inset-0 z-50 bg-[#111111]/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl rounded-2xl bg-white overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 bg-[#111111] text-white flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#E8C547]">
                    {previewItem.category}
                  </p>
                  <h3
                    id="preview-project-title"
                    className="font-display text-lg font-bold"
                  >
                    {previewItem.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  aria-label="Close preview"
                  className="w-9 h-9 rounded-md bg-white/10 hover:bg-[#E8C547] hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#FFF4CC]/25 max-h-[60vh] overflow-hidden flex items-center justify-center border-b border-[#111111]/10">
                <img
                  src={previewItem.imageUrl}
                  alt={previewItem.name}
                  className="max-h-[60vh] w-full object-contain"
                />
              </div>

              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm text-[#3F3F3F] leading-relaxed">
                  {previewItem.description}
                </p>
                {previewItem.projectUrl && (
                  <a
                    href={previewItem.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#111111] bg-[#E8C547] hover:bg-[#111111] hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
