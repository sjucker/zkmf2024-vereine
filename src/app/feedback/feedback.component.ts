import {Component, OnInit, signal} from '@angular/core';
import {JudgeReportCategory, JudgeReportCategoryRating, JudgeReportFeedbackDTO, JudgeReportModulCategory, JudgeReportRatingDTO, JudgeReportTitleDTO, JudgeReportViewDTO, Modul} from "../rest";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BackendService} from "../service/backend.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {

  feedbacks?: JudgeReportFeedbackDTO;

  loading = signal(false);
  errorMessage = signal('');

  constructor(private readonly route: ActivatedRoute,
              public snackBar: MatSnackBar,
              private backendService: BackendService) {
  }

  ngOnInit(): void {
    const modul = this.route.snapshot.paramMap.get('modul');
    const category = this.route.snapshot.paramMap.get('category') ?? undefined;
    if (modul) {
      this.loading.set(true);
      this.backendService.feedback(modul, category).subscribe({
          next: feedback => {
            this.feedbacks = feedback;
            this.loading.set(false);
          },
          error: () => {
            this.errorMessage.set('Feedback noch nicht vorhanden...')
            this.loading.set(false);
          }
        }
      );
    }
  }

  get judgeFeedbacks(): JudgeReportViewDTO[] {
    if (this.feedbacks) {
      let result = [this.feedbacks.judge1, this.feedbacks.judge2, this.feedbacks.judge3];
      if (this.feedbacks.judge4) {
        result = [...result, this.feedbacks.judge4];
      }
      return result;
    }
    return [];
  }

  getGroups(title: JudgeReportTitleDTO): string[] {
    return [...new Set(title.ratings.map(r => r.group))];
  }

  getRatings(title: JudgeReportTitleDTO, group: string): JudgeReportRatingDTO[] {
    return title.ratings.filter(r => r.group === group);
  }

  getRatingDescription(rating: JudgeReportCategoryRating) {
    switch (rating) {
      case JudgeReportCategoryRating.VERY_NEGATIVE:
        return "--";
      case JudgeReportCategoryRating.NEGATIVE:
        return "-";
      case JudgeReportCategoryRating.NEUTRAL:
        return "0";
      case JudgeReportCategoryRating.POSITIVE:
        return "+";
      case JudgeReportCategoryRating.VERY_POSITIVE:
        return "++";
    }
  }

  getRatingClass(rating: JudgeReportCategoryRating) {
    switch (rating) {
      case JudgeReportCategoryRating.VERY_NEGATIVE:
        return "very-negative";
      case JudgeReportCategoryRating.NEGATIVE:
        return "negative";
      case JudgeReportCategoryRating.NEUTRAL:
        return "neutral";
      case JudgeReportCategoryRating.POSITIVE:
        return "positive";
      case JudgeReportCategoryRating.VERY_POSITIVE:
        return "very-positive";
    }
  }

  isModulG(): boolean {
    return this.feedbacks?.modul === Modul.G;
  }

  isModulGKatA(): boolean {
    return this.feedbacks?.category === JudgeReportModulCategory.MODUL_G_KAT_A;
  }

  isModulGKatB(): boolean {
    return this.feedbacks?.category === JudgeReportModulCategory.MODUL_G_KAT_B;
  }

  isModulGKatC(): boolean {
    return this.feedbacks?.category === JudgeReportModulCategory.MODUL_G_KAT_C;
  }

  getGrundlage1Rating(feedback: JudgeReportViewDTO): JudgeReportRatingDTO {
    return feedback.overallRatings.find(dto => dto.category === JudgeReportCategory.GRUNDLAGE_1) ?? {
      category: JudgeReportCategory.GRUNDLAGE_1,
      categoryDescription: '',
      group: '',
      ratingDescriptions: [],
      rating: JudgeReportCategoryRating.NEUTRAL
    };
  }

  getGrundlage1Abzug(feedback: JudgeReportViewDTO): JudgeReportRatingDTO {
    return feedback.overallRatings.find(dto => dto.category === JudgeReportCategory.GRUNDLAGE_1_ABZUG) ?? {
      category: JudgeReportCategory.GRUNDLAGE_1_ABZUG,
      categoryDescription: '',
      group: '',
      ratingDescriptions: [],
      rating: JudgeReportCategoryRating.NEUTRAL
    };
  }

  getGrundlage2Rating(feedback: JudgeReportViewDTO): JudgeReportRatingDTO {
    return feedback.overallRatings.find(dto => dto.category === JudgeReportCategory.GRUNDLAGE_2) ?? {
      category: JudgeReportCategory.GRUNDLAGE_2,
      categoryDescription: '',
      group: '',
      ratingDescriptions: [],
      rating: JudgeReportCategoryRating.NEUTRAL
    };
  }

  getGrundlage2Abzug(feedback: JudgeReportViewDTO): JudgeReportRatingDTO {
    return feedback.overallRatings.find(dto => dto.category === JudgeReportCategory.GRUNDLAGE_2_ABZUG) ?? {
      category: JudgeReportCategory.GRUNDLAGE_2_ABZUG,
      categoryDescription: '',
      group: '',
      ratingDescriptions: [],
      rating: JudgeReportCategoryRating.NEUTRAL
    };
  }

  getKatATitel1(feedback: JudgeReportViewDTO): JudgeReportTitleDTO | undefined {
    return feedback.titles[0];
  }

  getKatATitel2(feedback: JudgeReportViewDTO): JudgeReportTitleDTO | undefined {
    return feedback.titles[1];
  }

  getKatBTitel(feedback: JudgeReportViewDTO): JudgeReportTitleDTO | undefined {
    return feedback.titles[0];
  }

  getKatCTitel(feedback: JudgeReportViewDTO): JudgeReportTitleDTO | undefined {
    return feedback.titles[0];
  }

}
